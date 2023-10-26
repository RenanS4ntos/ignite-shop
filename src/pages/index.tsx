import { styled } from "@/styles"

const Button = styled('button', {
  display: 'flex',
  gap: 3,
  backgroundColor: '$green300',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',
  color: '$gray100',

  span: {
    fontWeight: "bold"
  },

  '&:hover': {
    filter: 'brightness(0.8)',
  }
})

export default function Home() {
  return (
   <Button>
    <span>Teste</span>
    Enviar
   </Button>
  )
}
