import * as React from 'react';

export const initialState = {
	showFilters: false,
	keys: [
		{
			id: 1,
			isActive: false,
			name: 'id',
			label: 'ID',
			hidden: true
		},
		{
			id: 2,
			isActive: false,
			name: 'category',
			label: 'Kategoria',
			hidden: true
		},
		{
			id: 3,
			isActive: false,
			name: 'signature',
			label: 'Sygnatura',
			hidden: true
		},
		{
			id: 4,
			isActive: true,
			name: 'firstname',
			label: 'Imię',
			hidden: false
		},
		{
			id: 5,
			isActive: true,
			name: 'surname',
			label: 'Nazwisko',
			hidden: false
		},
		{
			id: 6,
			isActive: true,
			name: 'title',
			label: 'Tytuł',
			hidden: false
		},
		{
			id: 7,
			isActive: true,
			name: 'series',
			label: 'Seria Wydawnicza',
			hidden: false
		},
		{
			id: 8,
			isActive: true,
			name: 'place',
			label: 'Miejsce Wydania',
			hidden: false
		},
		{
			id: 9,
			isActive: true,
			name: 'year',
			label: 'Rok wydania',
			hidden: false
		},
		{
			id: 10,
			isActive: true,
			name: 'publisher',
			label: 'Wydawca',
			hidden: false
		},
		{
			id: 11,
			isActive: false,
			name: 'printingHouse',
			label: 'Drukarnia',
			hidden: true
		},
		{
			id: 12,
			isActive: false,
			name: 'format',
			label: 'Format',
			hidden: true
		},
		{
			id: 13,
			isActive: false,
			name: 'pages',
			label: 'Liczba Stron',
			hidden: true
		},
		{
			id: 14,
			isActive: true,
			name: 'appendices',
			label: 'Załączniki',
			hidden: false
		},
		{
			id: 15,
			isActive: false,
			name: 'publishingDetails',
			label: 'Sczegóły Wydania',
			hidden: true
		},
		{
			id: 16,
			isActive: true,
			name: 'extras',
			label: 'Autografy, Dedykacje...',
			hidden: false
		},
		{
			id: 17,
			isActive: true,
			name: 'description',
			label: 'Opis',
			hidden: false
		}
	],
	categories: [
		{
			id: 1,
			label: 'p',
			active: false
		},
		{
			id: 2,
			label: 'g',
			active: false
		},
		{
			id: 3,
			label: 'c',
			active: false
		},
		{
			id: 4,
			label: 'b',
			active: false
		},
		{
			id: 5,
			label: 'v',
			active: false
		},
		{
			id: 6,
			label: 'o',
			active: false
		}
	]
};