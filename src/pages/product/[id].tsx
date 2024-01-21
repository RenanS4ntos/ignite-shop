import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    defaultPriceId: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  function handleBuyAProduct() {
    console.log(product.defaultPriceId)
  }

  if (isFallback) {
    return <p>Loading....</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h2>{product.name}</h2>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyAProduct}>Compre agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  // buscar os produtos mais vendidos / mais acessados

  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id

  if (!productId) return { props: {}, revalidate: 60 * 60 * 1 } // 1 hour

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  const priceId = price?.id

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price.unit_amount / 100)
          : 0,
        description: product.description,
        defaultPriceId: priceId,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
