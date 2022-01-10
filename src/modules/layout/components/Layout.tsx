import Head from 'next/head';
import { Footer } from 'modules/layout/components/Footer';
import { OpenGraph, Props as OpenGraphProps } from './OpenGraph';

export interface Props {
	title?: string;
	description?: string;
	og?: OpenGraphProps;
}

export const Layout: React.FC<Props> = ({
	title,
	description = 'The tool for all of your maze solving needs',
	og,
	children,
}) => {
	const fullTitle = title ? `${title} | Amazing` : 'Amazing';

	og ||= {
		title: fullTitle,
		description,
	};

	og.image ||= {
		url: `${process.env.NEXT_PUBLIC_HOST_URL}/og_image.png`,
		alt: 'A photo of Edsger Wybe Dijkstra',
	};

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
				{description && <meta name="description" content={description} key="desc" />}
			</Head>
			<OpenGraph {...og} />

			{children}
			<Footer />
		</>
	);
};
