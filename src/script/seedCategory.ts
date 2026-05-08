import { prisma } from "../lib/prisma";

async function seedCategory() {

    try {

        const categoryData = [
            {
                "name": "Burgers",
                "image": "https://i.ibb.co.com/wF6X9NDz/foodiesfeed-com-beef-burger-with-egg-and-onion.jpg",
                "slug": "burgers"
            },
            {
                "name": "Pizzas",
                "image": "https://i.ibb.co.com/cKjMN3gf/foodiesfeed-com-pizza-fresh-out-of-oven-close-up.jpg",
                "slug": "pizzas"
            },
            {
                "name": "Biryani",
                "image": "https://i.ibb.co.com/r2nWWkJB/foodiesfeed-com-delicious-chicken-biryani-with-raita-and-garnishes.jpg",
                "slug": "biryani"
            },
            {
                "name": "Fast Food",
                "image": "https://i.ibb.co.com/Rr8LJvn/mark-patterson-y-Vfag-Kp-Deoc-unsplash.jpg",
                "slug": "fast-food"
            },
            {
                "name": "Bangladeshi",
                "image": "https://i.ibb.co.com/Wvbkyvg1/pexels-saveurssecretes-9392999.jpg",
                "slug": "bangladeshi"
            },
            {
                "name": "Indian",
                "image": "https://i.ibb.co.com/G384dPSk/kalyani-akella-gml9g1k-RQc-M-unsplash.jpg",
                "slug": "indian"
            },
            {
                "name": "Chinese",
                "image": "https://i.ibb.co.com/My2vW7KS/wang-binghua-BJ9-V2jg54ck-unsplash.jpg",
                "slug": "chinese"
            },
            {
                "name": "Arabic",
                "image": "https://i.ibb.co.com/ccjLNKWM/close-up-appetizing-ramadan-meal-1.jpg",
                "slug": "arabic"
            },
            {
                "name": "BBQ",
                "image": "https://i.ibb.co.com/jsZPsvk/foodiesfeed-com-steak-cooked-on-fire.jpg",
                "slug": "bbq"
            },
            {
                "name": "Seafood",
                "image": "https://i.ibb.co.com/fVkQMfbS/foodiesfeed-com-delicious-fried-salmon-fillet-with-herbs-1.jpg",
                "slug": "seafood"
            },
            {
                "name": "Desserts",
                "image": "https://i.ibb.co.com/h1McD892/foodiesfeed-com-slice-of-chocolate-cake-2.jpg",
                "slug": "desserts"
            },
            {
                "name": "Bakery",
                "image": "https://i.ibb.co.com/zVvjzN6L/foodiesfeed-com-wholemeal-bread-placed-on-a-wooden-table-1.jpg",
                "slug": "bakery"
            },
            {
                "name": "Cakes",
                "image": "https://i.ibb.co.com/bgft5KQZ/umesh-soni-LDnmy-Oa-A-ew-unsplash-1.jpg",
                "slug": "cakes"
            },
            {
                "name": "Coffee",
                "image": "https://i.ibb.co.com/yB7mmHBt/foodiesfeed-com-artisan-coffee-and-delights-on-a-rustic-table-1.jpg",
                "slug": "coffee"
            },
            {
                "name": "Pasta",
                "image": "https://i.ibb.co.com/9348tfdk/amr-taha-KWr-Hqvf-JSfw-unsplash-1.jpg",
                "slug": "pasta"
            },
        ]

        console.log("seeding category started");
        const result = await prisma.category.createMany({
            data: categoryData,
            skipDuplicates: true
        })
        console.log("seeded category successfully");
        console.log(result);


    } catch (error: any) {
        console.error("Seeding failed");
        console.error(error.message);
    }
    finally {
        await prisma.$disconnect();
    }
}

seedCategory();