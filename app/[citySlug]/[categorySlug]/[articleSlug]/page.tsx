import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter'; // For parsing frontmatter
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify'; // Added for HTML output

interface ArticleFrontmatter {
  title?: string;
  description?: string;
  city?: string;
  category?: string;
  date?: string;
  // Add any other frontmatter fields you expect
}

// Interface for the resolved params object
interface ResolvedPageParams {
  citySlug: string;
  categorySlug: string;
  articleSlug: string;
}

// PageProps is no longer used directly by SpecificArticlePage if params are typed inline.
// It might still be useful if/when generateMetadata is uncommented and used.
// For now, to resolve the ESLint error, we can comment it out or remove it if generateMetadata remains unused.
// Let's comment it out for now.
// interface PageProps {
//   params: {
//     citySlug: string;
//     categorySlug: string;
//     articleSlug: string; // New parameter for the specific article
//   };
// }

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
                    const articleSlug = articleFile.name.replace('.md', '');
                    // Ensure no duplicates, though less likely here with specific file paths
                    if (!paramsList.some(p => p.citySlug === citySlug && p.categorySlug === categorySlug && p.articleSlug === articleSlug)) {
                        paramsList.push({ citySlug, categorySlug, articleSlug });
                    }
                  }
                }
              } catch (articleReadError) {
                console.warn(`Could not read article files in ${articleFilesPath}:`, articleReadError instanceof Error ? articleReadError.message : articleReadError);
              }
            }
          }
        } catch (cityError) {
          console.warn(`Could not read city directories in ${cityDirsPath}:`, cityError instanceof Error ? cityError.message : cityError);
        }
      }
    }
  } catch (rootError) {
    console.error(`Could not read root articles directory ${rootArticlesDir}:`, rootError instanceof Error ? rootError.message : rootError);
  }
  
  if (paramsList.length === 0) {
    console.warn("[generateStaticParams for SpecificArticlePage] No city/category/article paths found. Article pages might not be pre-rendered correctly.");
  }
  // console.log("[generateStaticParams for SpecificArticlePage] Generated params:", paramsList);
  return paramsList; 
}


export default async function SpecificArticlePage({ params }: { params: Promise<ResolvedPageParams> }) {
  const { citySlug, categorySlug, articleSlug }: ResolvedPageParams = await params;
  
  // Updated file path construction to match new directory structure
  // content/articles/[categorySlug]/[citySlug]/[articleSlug].md
  const expectedFilename = `${articleSlug}.md`; // Assuming articleSlug from URL is the filename
  const filePath = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug, expectedFilename);

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Article file not found: ${filePath}`, error);
    notFound(); 
  }

  const { data, content: markdownBody } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // Keep raw HTML if any
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdownBody);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose lg:prose-xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{frontmatter.title || 'Article Title'}</h1>
        {frontmatter.city && frontmatter.category && (
          <p className="text-sm text-gray-600">
            In {frontmatter.city} / {frontmatter.category}
            {/* You might want to display the specific article sub-topic here if available in frontmatter */}
          </p>
        )}
        {frontmatter.date && (
          <p className="text-sm text-gray-500">
            Published on: {new Date(frontmatter.date).toLocaleDateString()}
          </p>
        )}
      </header>
      
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}

// Optional: Add metadata generation
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { citySlug, categorySlug, articleSlug } = params;
//   const expectedFilename = `${articleSlug}.md`; 
//   const filePath = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug, expectedFilename);
//   // ... rest of metadata fetching logic ...
// } 