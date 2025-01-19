// Sample data for the application
const menuItems = [
    {
        id: 1,
        name: "Classic Coffee",
        price: 30,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=400",
        rating: 4.5,
        available: true
    },
    {
        id: 2,
        name: "Masala Dosa",
        price: 60,
        category: "Meals",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=400",
        rating: 4.8,
        available: true
    },
    {
        id: 3,
        name: "Veg Sandwich",
        price: 40,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&h=400",
        rating: 4.3,
        available: true
    },
    {
        id: 4,
        name: "Samosa",
        price: 15,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&h=400",
        rating: 4.6,
        available: true
    },
    {
        id: 5,
        name: "Cold Coffee",
        price: 45,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&h=400",
        rating: 4.7,
        available: true
    },
    {
        id: 6,
        name: "Thali",
        price: 80,
        category: "Meals",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&h=400",
        rating: 4.9,
        available: true
    }
];

// Get trending items (items with rating >= 4.5)
const trendingItems = menuItems.filter(item => item.rating >= 4.5);
