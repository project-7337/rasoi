const setProducts = (products) => {
	return {
		type: "SET_PRODUCTS",
		payload: products,
	};
};

const selectedProduct = (product) => {
	return {
		type:"SELECTED_PRODUCT",
		payload: product,
	};
};

const removeSelectedProduct = () => {
	return {
		type: "REMOVE_SELECTED_PRODUCT",
	};
};

export default {
	setProducts,
	selectedProduct,
	removeSelectedProduct
};