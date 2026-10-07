import prisma from "@/lib/prisma";

// ฟังก์ชัน API: GET (Read) ดึงข้อมูลตามเงื่อนไขที่กำหนดจากตาราง products
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  //เอา id ที่ส่งมากับ URL มาแปลงเป็นตัวเลข
  const { id } = await params;

  //ให้ prisma ดึงข้อมูลจากตาราง products ตาม id ที่กำหนด
  const product = await prisma.products.findUnique({
    where: { id: Number(id) },
  });

  //ถ้าไม่เจอข้อมูล ส่งผลการทำงานกลับไปยัง client-user สำหรับ status เป็น 404
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  //ส่งผลการทำงานกลับไปยัง client-user เป็น JSON ทั้งนี้สำหรับการดึงข้อมูลสำหรับ status เป็น 200
  return Response.json(product, {
    status: 200,
  });
}

// ฟังก์ชัน API: PUT (Update) แก้ไขข้อมูลตามเงื่อนไขที่กำหนดจากตาราง products
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  //เอาข้อมูลที่ส่งมาที่จะเอาไปแก้ไขใน table ซึ่งเป็น JSON เราจะมาเอามาใส่ตัวแปรเพื่อจะเอาไปใช้งาน
  const body = await request.json();

  const existing = await prisma.products.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  //เอาข้อมูลที่อยู่ใน body มากำหนดให้กับ prisma เพื่อเอาไปแก้ไขใน table ตาม id ที่กำหนด
  const product = await prisma.products.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
    },
  });

  //ส่งผลการทำงานกลับไปยัง client-user เป็น JSON ทั้งนี้สำหรับการแก้ไขสำหรับ status เป็น 200
  return Response.json(product, {
    status: 200,
  });
}

// ฟังก์ชัน API: DELETE (Delete) ลบข้อมูลตามเงื่อนไขที่กำหนดจากตาราง products
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const existing = await prisma.products.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  //ให้ prisma ลบข้อมูลจากตาราง products ตาม id ที่กำหนด
  await prisma.products.delete({
    where: { id: Number(id) },
  });

  //ส่งผลการทำงานกลับไปยัง client-user เป็น JSON ทั้งนี้สำหรับการลบสำหรับ status เป็น 200
  return Response.json(
    { message: "Product deleted successfully" },
    {
      status: 200,
    },
  );
}
