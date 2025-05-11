import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter'; // For parsing frontmatter
import { remark } from 'remark';   // For parsing markdown
import html from 'remark-html';  // For converting remark output to HTML

interface ArticleFrontmatter {
  title?: string;
  description?: string;
  city?: string;
  category?: string;
  date?: string;
  // Add any other frontmatter fields you expect
}

interface PageProps {
  params: {
    citySlug: string;
    categorySlug: string;
    articleSlug: string; // New parameter for the specific article
  };
}

export async function generateStaticParams() {
  // This function will need to list all possible combinations of 
  // citySlug, categorySlug, and articleSlug.
  // You would typically scan all category folders, then city subfolders, then md files.
  // Example: content/articles/gay/atri/index.md -> { citySlug: 'atri', categorySlug: 'gay', articleSlug: 'index' }
  
  // Placeholder - needs proper implementation
  // const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  // const categoryDirs = await fs.readdir(rootArticlesDir);
  // const paramsList = [];
  // for (const catSlug of categoryDirs) {
  //   const cityDirsPath = path.join(rootArticlesDir, catSlug);
  //   try {
  //      const citySubDirs = await fs.readdir(cityDirsPath);
  //      for (const cSlug of citySubDirs) {
  //        const articleFilesPath = path.join(cityDirsPath, cSlug);
  //        try {
  //          const articleFiles = await fs.readdir(articleFilesPath);
  //          for (const articleFile of articleFiles) {
  //            if (articleFile.endsWith('.md')) {
  //              paramsList.push({ 
  //                citySlug: cSlug, 
  //                categorySlug: catSlug, 
  //                articleSlug: articleFile.replace('.md', '')
  //              });
  //            }
  //          }
  //        } catch (e) { /* ignore if not a directory or no files */ }
  //      }
  //   } catch (e) { /* ignore if not a directory */ }
  // }
  // return paramsList;
  return []; 
}


export default async function SpecificArticlePage({ params }: PageProps) {
  const { citySlug, categorySlug, articleSlug } = params;
  
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

  const processedContent = await remark().use(html).process(markdownBody);
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