import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogData";

interface BlogSEOProps {
  post?: BlogPost;
  isList?: boolean;
  category?: string;
  imageUrl?: string;
}

export default function BlogSEO({ post, isList, category, imageUrl }: BlogSEOProps): JSX.Element {
  const baseUrl = "https://tansenangdembe.com.np";
  const authorName = "Tansen Angdembe";
  const authorUrl = "https://tansenangdembe.com.np";

  if (isList) {
    const listTitle = category && category !== "All"
      ? `${category} Guides & Tutorials | Tansen Angdembe Engineering Blog`
      : "Developer Engineering Blog & Tutorials | Tansen Angdembe";
    const listDesc = category && category !== "All"
      ? `Explore in-depth articles, production architecture tips, and troubleshooting guides on ${category} by Tansen Angdembe.`
      : "In-depth engineering tutorials, architecture guides, and troubleshooting walkthroughs covering Spring Boot, AWS, Docker, Redis, MySQL, Linux, and Modern Java.";
    const listUrl = `${baseUrl}/blog`;
    const defaultOgImage = `${baseUrl}/preview.jpg`;

    const listSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: listTitle,
      description: listDesc,
      url: listUrl,
      author: {
        "@type": "Person",
        name: authorName,
        url: authorUrl,
      },
      publisher: {
        "@type": "Person",
        name: authorName,
      },
    };

    return (
      <Helmet>
        <title>{listTitle}</title>
        <meta name="description" content={listDesc} />
        <meta
          name="keywords"
          content="Spring Boot, Java, AWS, Docker, Kubernetes, Redis, MySQL, Linux, Git, REST API, System Design, Troubleshooting, Tansen Angdembe"
        />
        <meta name="author" content={authorName} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={listUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={listTitle} />
        <meta property="og:description" content={listDesc} />
        <meta property="og:url" content={listUrl} />
        <meta property="og:image" content={defaultOgImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={listTitle} />
        <meta name="twitter:description" content={listDesc} />
        <meta name="twitter:image" content={defaultOgImage} />

        {/* JSON-LD Collection Page */}
        <script type="application/ld+json">{JSON.stringify(listSchema)}</script>
      </Helmet>
    );
  }

  if (!post) return <></>;

  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = imageUrl || `${baseUrl}/preview.jpg`;

  // TechArticle / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.metaDescription,
    image: [ogImage],
    datePublished: post.publishedDate,
    dateModified: post.lastModified || post.publishedDate,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/mylogo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.sections.reduce((acc, sec) => acc + sec.content.split(" ").length, 0) + 450,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `${baseUrl}/blog?category=${encodeURIComponent(post.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  // FAQPage Schema if FAQs exist
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{`${post.title} | Tansen Angdembe`}</title>
      <meta name="description" content={post.metaDescription} />
      <meta name="keywords" content={post.keywords.join(", ")} />
      <meta name="author" content={authorName} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.metaDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="article:published_time" content={post.publishedDate} />
      {post.lastModified && <meta property="article:modified_time" content={post.lastModified} />}
      <meta property="article:author" content={authorName} />
      <meta property="article:section" content={post.category} />
      {post.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@tansenAngdembe" />

      {/* Structured Data Scripts */}
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
}
