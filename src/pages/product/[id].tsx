import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()
  const { id } = query;

  return <h1>Product {id}</h1>
}