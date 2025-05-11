import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter'; // For parsing frontmatter
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit'; // To traverse HAST
import type { Root as HastRoot, Element as HastElement, ElementContent as HastElementContent, Text as HastText } from 'hast';
import type { Root as MdastRootType } from 'mdast';

// Shadcn UI Accordion components - will be used by the client component
// We still define the structure here, but rendering moves to client component

// Import the new client component that will handle actual rendering
import ArticleContentRenderer from '@/components/common/article-content-renderer'; // Adjust path as needed

interface ArticleFrontmatter {
  title?: string;
  description?: string;
  city?: string;
  category?: string;
  date?: string;
  articleSlug: string;
}

interface ResolvedPageParams {
  citySlug: string;
  categorySlug: string;
  articleSlug: string;
}

// Interface for individual heading, to be used by Table of Contents
export interface HeadingData {
  id: string;
  text: string;
  level: number;
}

// This interface will be passed to the client component
export interface AccordionSectionData {
  id: string;
  title: string;
  level: number;
  contentHastNodes: HastElementContent[]; // Raw HAST nodes
}

export interface ArticleRenderData {
  leadingHastNodes: HastElementContent[]; // Raw HAST nodes
  accordionSections: AccordionSectionData[];
  frontmatter: ArticleFrontmatter;
  headings: HeadingData[]; // Added headings for TOC
}

// Helper function to extract text from a HAST element
function getElementText(node: HastElement): string {
  let text = '';
  visit(node, 'text', (textNode: HastText) => {
    text += textNode.value;
  });
  return text.trim();
}

// Function to transform HAST into leading content and accordion sections with HAST nodes
function prepareArticleRenderData(hast: HastRoot, frontmatter: ArticleFrontmatter): ArticleRenderData {
  const leadingHastNodes: HastElementContent[] = [];
  const accordionSections: AccordionSectionData[] = [];
  const headings: HeadingData[] = []; // Initialize headings array
  
  let currentAccordionSectionData: AccordionSectionData | null = null;
  let sectionCounter = 0;
  let inLeadingContent = true;

  hast.children.forEach((node) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      inLeadingContent = false;
      sectionCounter++;
      const title = getElementText(node);
      let id = node.properties?.id?.toString() || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || `section-${sectionCounter}`;
      id = id.replace(/^-+|-+$/g, '');
      id = id || `section-${sectionCounter}`; 

      const headingLevel = node.tagName === 'h2' ? 2 : 3;
      headings.push({ id, text: title, level: headingLevel }); // Populate headings

      currentAccordionSectionData = {
        id: id,
        title: title || 'Untitled Section',
        level: headingLevel,
        contentHastNodes: [],
      };
      accordionSections.push(currentAccordionSectionData);
    } else if (currentAccordionSectionData && !inLeadingContent) {
      if (node.type === 'element' || node.type === 'text' || node.type === 'comment') {
        currentAccordionSectionData.contentHastNodes.push(node);
      }
    } else if (inLeadingContent) {
       if (node.type === 'element' || node.type === 'text' || node.type === 'comment') {
        leadingHastNodes.push(node);
      }
    }
  });

  const filteredAccordionSections = accordionSections.filter(section => section.contentHastNodes.length > 0);
  const filteredLeadingHastNodes = leadingHastNodes.filter(node => node.type === 'text' ? node.value.trim() !== '' : true);
  
  return {
    leadingHastNodes: filteredLeadingHastNodes,
    accordionSections: filteredAccordionSections,
    frontmatter,
    headings, // Return headings
  };
}

export async function generateStaticParams(): Promise<{ citySlug: string; categorySlug: string; articleSlug: string; }[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: { citySlug: string; categorySlug: string; articleSlug: string; }[] = [];
  try {
    const categoryDirs = await fs.readdir(rootArticlesDir, { withFileTypes: true });
    for (const categoryDir of categoryDirs) {
      if (categoryDir.isDirectory()) {
        const categorySlug = categoryDir.name;
        const cityDirsPath = path.join(rootArticlesDir, categorySlug);
        try {
          const cityDirs = await fs.readdir(cityDirsPath, { withFileTypes: true });
          for (const cityDir of cityDirs) {
            if (cityDir.isDirectory()) {
              const citySlug = cityDir.name;
              const articleFilesPath = path.join(cityDirsPath, citySlug);
              try {
                const articleFiles = await fs.readdir(articleFilesPath, { withFileTypes: true });
                for (const articleFile of articleFiles) {
                  if (articleFile.isFile() && articleFile.name.endsWith('.md')) {
                    const articleSlugFromFile = articleFile.name.replace('.md', '');
                    if (!paramsList.some(p => p.citySlug === citySlug && p.categorySlug === categorySlug && p.articleSlug === articleSlugFromFile)) {
                        paramsList.push({ citySlug, categorySlug, articleSlug: articleSlugFromFile });
                    }
                  }
                }
              } catch { console.warn(`Could not read files in ${articleFilesPath}`); }
            }
          }
        } catch { console.warn(`Could not read city dirs in ${cityDirsPath}`); }
      }
    }
  } catch { console.error(`Could not read root articles dir ${rootArticlesDir}`); }
  if (paramsList.length === 0) {
    console.warn("[generateStaticParams SpecificArticlePage] No params found.");
  }
  return paramsList; 
}


export default async function SpecificArticlePage({ params }: { params: Promise<ResolvedPageParams> }) {
  const resolvedParams = await params;
  const { citySlug, categorySlug, articleSlug } = resolvedParams;
  
  const expectedFilename = `${articleSlug}.md`;
  const filePath = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug, expectedFilename);

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Article file not found: ${filePath}`, error);
    notFound(); 
  }

  const { data: frontmatterData, content: markdownBody } = matter(fileContent);
  const frontmatter = frontmatterData as ArticleFrontmatter;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug);

  const mdastNode = processor.parse(markdownBody) as MdastRootType;
  const hastNode = await processor.run(mdastNode) as HastRoot;

  const articleRenderData = prepareArticleRenderData(hastNode, frontmatter);

  // Fallback if no content could be structured - this also needs to be rethought 
  // as dangerouslySetInnerHTML will not work with client component rendering HAST
  // For now, we'll pass the raw markdownBody to the client component for fallback.
  if (articleRenderData.leadingHastNodes.length === 0 && articleRenderData.accordionSections.length === 0) {
    return (
        <ArticleContentRenderer 
            leadingHastNodes={[]} 
            accordionSections={[]} 
            frontmatter={articleRenderData.frontmatter}
            headings={[]} // Pass empty headings for fallback
            fallbackMarkdownBody={markdownBody} // Pass raw markdown for client-side fallback processing
        />
    );
  }

  return (
    <ArticleContentRenderer 
        leadingHastNodes={articleRenderData.leadingHastNodes} 
        accordionSections={articleRenderData.accordionSections} 
        frontmatter={articleRenderData.frontmatter}
        headings={articleRenderData.headings} // Pass populated headings
        // fallbackMarkdownBody is not needed if we have sections
    />
  );
}

// Optional: Metadata generation (can remain largely the same, using frontmatter)
// export async function generateMetadata({ params }: { params: ResolvedPageParams }): Promise<Metadata> {
//   // ... logic to fetch frontmatter ...
//   return { title: frontmatter.title, description: frontmatter.description };
// } 
// } 