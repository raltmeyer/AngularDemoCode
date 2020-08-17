export class Appointment {
	constructor (
		public id: number,
		public title: string,
		public doctorName: string,
		public done: boolean
	) { }
}