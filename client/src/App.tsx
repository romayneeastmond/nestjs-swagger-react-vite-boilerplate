import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemListPage from './pages/items/ItemListPage';
import ItemDetailPage from './pages/items/ItemDetailPage';
import ItemCreatePage from './pages/items/ItemCreatePage';
import ItemEditPage from './pages/items/ItemEditPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/items" replace />} />
				<Route path="/items" element={<ItemListPage />} />
				<Route path="/items/new" element={<ItemCreatePage />} />
				<Route path="/items/:id" element={<ItemDetailPage />} />
				<Route path="/items/:id/edit" element={<ItemEditPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;