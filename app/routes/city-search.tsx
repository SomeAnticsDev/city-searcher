import type {LoaderArgs} from '@remix-run/node';
import {searchCities} from '../models/cities.server';
import {json} from '@remix-run/node';

export async function loader({request}: LoaderArgs) {
	const url = new URL(request.url);
	const query = url.searchParams.get('q');
	const cities = await searchCities(query || '');
	const filteredCities = cities.slice(0, 20);
	return json(filteredCities, {
		headers: {
			'Cache-Control': 'max-age=60'
		}
	});
}