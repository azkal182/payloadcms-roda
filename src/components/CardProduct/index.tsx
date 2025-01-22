'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<
  Product,
  'slug' | 'categories' | 'meta' | 'title' | 'thumbnail' | 'price'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, categories, meta, title, thumbnail, price } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('rounded-xl overflow-hidden hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative w-full rounded-xl overflow-hidden">
        {!thumbnail && <div className="">No image</div>}
        {thumbnail && typeof thumbnail !== 'string' && <Media resource={thumbnail} size="33vw" />}
      </div>
      <div className="px-4">
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose text-sm" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        <p className="text-xl font-semibold">Rp. {new Intl.NumberFormat().format(price!)}</p>
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
