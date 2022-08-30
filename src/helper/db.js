// Assumed Nodes and Graphs

export const Nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const Graph = [
	{
		source: 'A',
		target: 'B',
		weight: 4
	}, {
		source: 'A',
		target: 'D',
		weight: 3
	}, {
		source: 'A',
		target: 'C',
		weight: 2
	}, {
		source: 'B',
		target: 'E',
		weight: 3
	}, {
		source: 'C',
		target: 'D',
		weight: 2
	}, {
		source: 'C',
		target: 'F',
		weight: 4
	}, {
		source: 'D',
		target: 'A',
		weight: 3
	}, {
		source: 'D',
		target: 'F',
		weight: 1
	}, {
		source: 'E',
		target: 'F',
		weight: 1
	}, {
		source: 'E',
		target: 'G',
		weight: 2
	}, {
		source: 'F',
		target: 'G',
		weight: 1
	}, {
		source: 'G',
		target: 'H',
		weight: 3
	}, {
		source: 'G',
		target: 'I',
		weight: 2
	}, {
		source: 'H',
		target: 'I',
		weight: 2
	}, {
		source: 'H',
		target: 'J',
		weight: 2
	}, {
		source: 'I',
		target: 'J',
		weight: 1
	},
];
