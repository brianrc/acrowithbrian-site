import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const EventPostTemplate = ({
  content,
  contentComponent,
  tags,
  helmet,
  start,
  end,
  category,
  location,
  address
}) => {
  const PostContent = contentComponent || Content
  const mapIframe = `<iframe
                width="100%"
                height="300"
                frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDzq49VRIOq9h7ykw2GiwJrXW-zdKGQHVM
                  &q=` + encodeURIComponent(location +', '+ address) + `" allowfullscreen>
              </iframe>`;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <section className="columns section event-details">
              <div className="column has-text-left">
                <h3>Event Details</h3>
                <dl>
                  <dt> Start: </dt>
                  <dd>
                    <abbr title="2016-12-30">{ start.toString() }</abbr>
                  </dd>

                  <dt> End: </dt>
                  <dd>
                    <abbr title="2017-01-01"> { end.toString() } </abbr>
                  </dd>

                  <dt>Category:</dt>
                  <dd>
                    { category }
                  </dd>
                </dl>
              </div>
              <div className="column has-text-left">
                <h3>Venue Details</h3>
                <dl>
                  <dt> Location: </dt>
                  <dd>
                    <abbr title="2016-12-30">{ location }</abbr>
                  </dd>

                  <dt> Address: </dt>
                  <dd>
                    <abbr title="2017-01-01"> { address } </abbr>
                  </dd>
                </dl>
              </div>

            </section>

            <div className="mapContainer" dangerouslySetInnerHTML={{
              __html: mapIframe
            }} />
          </div>

        </div>
      </div>
    </section>
  )
}

EventPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const EventPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout bodyClass="event" pageTitle={post.frontmatter.title} pageSubtitle={post.frontmatter.start} heroImage={post.frontmatter.hero}>
      <EventPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | Brian Cruikshank Acro Event"
          >
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        start={post.frontmatter.start}
        end={post.frontmatter.end}
        category={post.frontmatter.category}
        location={post.frontmatter.location}
        address={post.frontmatter.address}
      />
    </Layout>
  )
}

EventPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export default EventPost

export const eventPageQuery = graphql`
  query EventPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }        
        tags
        start
        end
        category
        location
        address
      }
    }
  }
`