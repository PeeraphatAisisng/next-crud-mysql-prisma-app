import prisma from "@/lib/prisma";

// ฟังก์ชัน API: POST (Create) เพิ่มข้อมูลลงตาราง products
export async function POST(request: Request) {
  //เอาข้อมูลที่ส่งมาที่จะเอาไปบันทึกลง table ซึ่งเป็น JSON เราจะมาเอามาใส่ตัวแปรเพื่อจะเอาไปใช้งาน
  const body = await request.json();

  //เอาข้อมูลที่อยู่ใน body มากำหนดให้กับ prisma เพื่อเอาไปบันทึกลง table
  const product = await prisma.products.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
    },
  });

  //ส่งผลการทำงานกลับไปยัง client-user เป็น JSON ทั้งนี้สำหรับการเพิ่มสำหรับ status เป็น 201
  return Response.json(product, {
    status: 201,
  });
}

// ฟังก์ชัน API: GET (Read) ดึงข้อมูลทั้งหมดจากตาราง products
export async function GET() {
  // ให้ prisma ดึงข้อมูลทั้งหมดจากตาราง products มาใส่ตัวแปร products
  const products = await prisma.products.findMany();

  //ส่งผลการทำงานกลับไปยัง client-user เป็น JSON ทั้งนี้สำหรับการดึงข้อมูลสำหรับ status เป็น 200
  return Response.json(products, {
    status: 200,
  });
}
