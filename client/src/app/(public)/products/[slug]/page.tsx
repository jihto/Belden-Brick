import ProductsDetails from "@/features/products/ProductsDetails";


export default async function ProductsDetailsPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    
    return (
        <ProductsDetails slug={slug} />
    )
}