import type { Product, RecentProductBlock as RecentProductBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionProduct } from '@/components/ColectionProduct'

export const RecentProductBlock: React.FC<
  RecentProductBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let products: Product[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedProducts = await payload.find({
      collection: 'products',
      depth: 1,
      limit,
    })

    products = fetchedProducts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedProducts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Product[]

      products = filteredSelectedProducts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16 text-center">
          <RichText className="ml-0 w-full" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionProduct products={products} />
    </div>
  )
}
