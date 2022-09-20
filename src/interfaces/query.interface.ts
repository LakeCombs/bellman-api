export interface Query_interface<payload> {
	status: boolean;
	action: string;
	message?: string;
	payload?: payload | null;
	data?: any;
	error?: any;
}
