import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { itemsService } from '../../services/items.service';
import { type Item } from '../../types/item.types';
import usePageTitle from '../../hooks/usePageTitle';

const ItemDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const [item, setItem] = useState<Item | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	usePageTitle(item ? item.name : 'Item Detail');

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const data = await itemsService.getOne(id!);
				setItem(data);
			} catch (err: unknown) {
				setError(err instanceof Error ? err.message : 'Failed to fetch item');
			} finally {
				setLoading(false);
			}
		};

		fetchItem();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!item) return <p>Item not found.</p>;

	return (
		<div>
			<h1>{item.name}</h1>
			<p>Description: {item.description ?? '—'}</p>
			<p>Price: {item.price != null ? `$${item.price.toFixed(2)}` : '—'}</p>
			<p>Created: {new Date(item.createdAt).toLocaleString()}</p>
			<p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
			<div>
				<Link to="/items">Back to Items</Link>
				{' | '}
				<Link to={`/items/${item.id}/edit`}>Edit</Link>
			</div>
		</div>
	);
};

export default ItemDetailPage;