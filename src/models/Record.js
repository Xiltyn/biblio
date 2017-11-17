export default class Record {
	constructor(data, latestID) {
		this.ID = Record.incrementId(latestID);
		this.category = data.category || 'G';
		this.signature = data.signature || '';
		this.surname = data.surname || '';
		this.firstname = data.firstname || '';
		this.title = data.title || '';
		this.series = data.series || '';
		this.place = data.place || '';
		this.year = data.year || '';
		this.publisher = data.publisher || '';
		this.printingHouse = data.printingHouse || '';
		this.format = data.format || '';
		this.pages = data.pages || '';
		this.appendices = data.appendices || '';
		this.publishingDetails = data.publishingDetails || '';
		this.autographs = data.autographs || '';
		this.description = data.description || '';
		this.timestamp = Record.getTimestap();
	}

	static incrementId(latestID) {
		if (!this.latestId) this.latestId = latestID + 1;
		else this.latestId++;
		return this.latestId
	}

	static getTimestap() {
		let timestamp = new Date();
		timestamp = timestamp.getTime();

		return timestamp
	}
}