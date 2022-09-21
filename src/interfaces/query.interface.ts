export interface Query_interface<payload> {
	[x: string]: any;
	status: boolean;
	action?: string;
	message?: string;
	payload?: payload | null;
	data?: any | null;
	error?: any;
}
