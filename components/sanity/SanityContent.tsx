import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { SanityImageAsset, Page } from "../../lib/types";
import SanityImage from "./SanityImage";
import Head from "next/head";
import SanityLink from "./SanityLink";

interface SanityContentProps {
	pageContent: Page;
}

const components: Partial<PortableTextReactComponents> = {
	types: {
		image: ({ value }) => (
			<div>
				<SanityImage source={value as SanityImageAsset} />
			</div>
		),
	},
	marks: {
		link: ({ children, value }) => (
			<SanityLink value={value}>{children}</SanityLink>
		),
	},
};

const SanityContent = ({ pageContent }: SanityContentProps) => {
	return (
		<>
			<Head>
				<title>{pageContent.title}</title>

				<meta name="description" content={pageContent.description} />

				<meta property="og:type" key="ogType" content="website" />
				<meta
					property="og:title"
					key="ogTitle"
					content={pageContent.title}
				/>
				<meta
					property="og:description"
					key="ogDescription"
					content={pageContent.description}
				/>
			</Head>
			<section role="article" aria-label={pageContent.title}>
				<article>
					<h1>{pageContent.title}</h1>
					<PortableText
						value={pageContent.body}
						components={components}
					/>
				</article>
			</section>
		</>
	);
};

export default SanityContent;
