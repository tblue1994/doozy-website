import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

interface TeamPageProps {
  data: {
    teamPage: {
      id: string
      title: string
      description: string
      blocks: sections.HomepageBlock[]
    }
  }
}

export default function TeamPage(props: TeamPageProps) {
  const { teamPage } = props.data

  return (
    <Layout>
      {teamPage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...(componentProps as any)} />
      })}
    </Layout>
  )
}
export const Head = (props: TeamPageProps) => {
  const { teamPage } = props.data
  return <SEOHead {...teamPage} />
}
export const query = graphql`
  {
    teamPage {
      id
      title
      description
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
      }
    }
  }
`
