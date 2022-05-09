import sanityClient from "../../lib/sanity";
import Image, { ImageProps } from "next/image";
import { useNextSanityImage, UseNextSanityImageProps } from "next-sanity-image";
import { SanityImageAsset } from "../../lib/types";
import { useMemo } from "react";

const getImageOptions = (
	imageProps: Required<UseNextSanityImageProps> & {
		placeholder: "blur";
	},
	maxWidth = "800px"
) => ({
	fill: {
		src: imageProps.src,
		loader: imageProps.loader,
	},
	responsive: {
		...imageProps,
		sizes: `(max-width: ${maxWidth}) 100vw, ${maxWidth}`,
	},
	intrinsic: {
		...imageProps,
	},
	fixed: {
		...imageProps,
	},
	raw: {
		...imageProps,
	},
});

interface Props extends Omit<ImageProps, "src"> {
	source: SanityImageAsset;
	maxWidth?: string;
}

const SanityImage = ({
	source,
	layout = "responsive",
	maxWidth = "800px",
	...rest
}: Props) => {
	const imageProps = useNextSanityImage(sanityClient, source);

	const imageOptions = useMemo(
		() => getImageOptions(imageProps, maxWidth),
		[imageProps, maxWidth]
	);

	return (
		<Image
			{...imageOptions[layout]}
			alt={source.alt ?? ""}
			layout={layout}
			{...rest}
		/>
	);
};

export default SanityImage;
