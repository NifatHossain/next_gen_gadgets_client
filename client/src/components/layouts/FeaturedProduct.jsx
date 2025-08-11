"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Graphics Card",
      price: 45000,
      image: "/images/graphics-card.png",
    },
    {
      id: 2,
      name: "Computer Monitor",
      price: 35000,
      image: "/images/monitor.png",
    },
    {
      id: 3,
      name: "CPU Cooler",
      price: 6500,
      image: "/images/cpu-cooler.png",
    },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col items-center text-center">
              <CardHeader>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                <p className="mt-2 text-muted-foreground font-medium">
                  ৳{product.price.toLocaleString("en-US")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
