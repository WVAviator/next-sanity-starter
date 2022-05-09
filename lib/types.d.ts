export interface SanityImageAsset {
	_key?: string;
	_type: string;
	asset: {
		_ref: string;
		_type: string;
	};
	alt?: string;
}

export interface SanityItem {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
}

export interface Page extends SanityItem {
	title: string;
	pageUrl: { current: string };
	description: string;
	body: any;
}
