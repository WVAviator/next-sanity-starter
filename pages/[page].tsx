import { GetStaticPaths, GetStaticProps } from "next";
import SanityContent from "../components/sanity/SanityContent";
import sanityClient from "../lib/sanity";
import { Page } from "../lib/types";

interface PageProps {
	page: Page;
}

const Page = ({ page }: PageProps) => {
	return (
		<div>
			<SanityContent pageContent={page} />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const pageUrl = params?.page;

	const query = `*[_type == "page" && pageUrl.current == $pageUrl
	][0]{
        body,
        description,
        title,
        pageUrl
      }`;

	const page: Page = await sanityClient.fetch(query, {
		pageUrl,
	});

	return {
		props: {
			page,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == "page"]{
        pageUrl
    }`;

	const pages: Page[] = await sanityClient.fetch(query);

	return {
		paths: pages.map((page) => ({
			params: {
				page: page.pageUrl.current,
			},
		})),

		fallback: false,
	};
};

export default Page;
