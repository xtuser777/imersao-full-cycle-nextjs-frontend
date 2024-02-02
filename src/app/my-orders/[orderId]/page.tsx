import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { OrderStatus } from "../../../models";
import { Total } from "../../../components/total";

const order = {
  id: "1",
  status: OrderStatus.PENDING,
  created_at: "2021-10-10T00:00:00.000Z",
  items: [
    {
      id: 1,
      product: {
        id: "1",
        name: "Camisa",
        description: "Camisa branca",
        price: 100,
        image_url: "https://source.unsplash.com/random?product",
        category_id: "1",
      },
      quantity: 2,
      price: 100,
    },
    {
      id: 2,
      product: {
        id: "2",
        name: "Calça",
        description: "Calça jeans",
        price: 100,
        image_url: "https://source.unsplash.com/random?product",
        category_id: "1",
      },
      quantity: 1,
      price: 100,
    },
  ],
  total: 1000,
};

async function MyOrderDetail({ params }: { params: { orderId: string } }) {
  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {order.status === OrderStatus.PENDING ? (
                <Typography variant="h1" sx={{ color: "warning.main" }}>
                  ⏳
                </Typography>
              ) : order.status === OrderStatus.PAID ? (
                <Typography variant="h1" sx={{ color: "success.main" }}>
                  ✔
                </Typography>
              ) : (
                <Typography variant="h1" sx={{ color: "error.main" }}>
                  ✖
                </Typography>
              )}
            </Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {order.status === OrderStatus.PENDING
                ? "Pedido pendente"
                : order.status === OrderStatus.PAID
                ? "Pedido pago"
                : "Pedido cancelado"}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd.</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.product.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Total total={order.total} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MyOrderDetail;