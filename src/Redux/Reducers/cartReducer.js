import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cart: {items:[]},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cart.items=[]
		},
		addItem: (state, item) => {
			console.log("Adding to cart")
			state.cart.items.push(item)
		},
		removeItem:(state,item)=>{
			state.cart.items.map((i,index)=>{
				if(i.id===item.id){
					state.cart.items.splice(index,1)
				}
			})
		},
		setCart: (state, cart) => {
			state.cart = cart.payload
		}
	},
})

export const {clearCart,addItem,removeItem, setCart } = cartSlice.actions

export default cartSlice.reducer