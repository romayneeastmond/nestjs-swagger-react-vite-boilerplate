import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { itemsService } from '../../services/items.service';
import type { Item } from '../../types/item.types';
import usePageTitle from '../../hooks/usePageTitle';

const ItemListPage = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	usePageTitle('List Items');

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const data = await itemsService.getAll();
				setItems(data);
			} catch (err: unknown) {
				setError(err instanceof Error ? err.message : 'Failed to fetch items');
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, []);

	const handleDelete = async (id: string) => {
		if (!window.confirm('Are you sure you want to delete this item?')) return;
		try {
			await itemsService.delete(id);
			setItems((prev) => prev.filter((item) => item.id !== id));
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Failed to delete item');
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<div>
				<h1>Items</h1>
				<Link to="/items/new">Create New Item</Link>
			</div>

			{items.length === 0 ? (
				<p>No items found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>{item.description ?? '—'}</td>
								<td>{item.price != null ? `$${item.price.toFixed(2)}` : '—'}</td>
								<td>
									<Link to={`/items/${item.id}`}>View</Link>
									{' | '}
									<Link to={`/items/${item.id}/edit`}>Edit</Link>
									{' | '}
									<button onClick={() => handleDelete(item.id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default ItemListPage;