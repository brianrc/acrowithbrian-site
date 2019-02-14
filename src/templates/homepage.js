import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import LatestPosts from '../components/LatestPosts';

export const HomepageTemplate = ({ title, aboutPhoto, content, photoHighlight, contentComponent, upcomingEvents, blogPosts }) => {
  const HomepageContent = contentComponent || Content

  return (
    <div>
      <section className="about-me section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section has-text-centered">
                <div className="columns">
                  <div className="column">
                    <figure className="image">
                      <PreviewCompatibleImage imageInfo={aboutPhoto} />
                    </figure>
                  </div>
                  <div className="column">
                    <h2 className="is-size-3 has-text-weight-bold is-bold-light">
                      About Me
                    </h2>
                    <HomepageContent className="content is-size-5" content={content} />
                    <Link to='/about' className="">
                      <button className="button is-link is-outlined">Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="photo-highlight section">
        <div className="full-width-photo-container" style={ photoHighlight && {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.0) ), url(${ photoHighlight.childImageSharp.fluid.src })`
        } }>
              <div className="section has-text-centered">
                <Link to='/photos' className="">
                  <button className="button is-medium is-link is-outlined">View Photos</button>
                </Link>
              </div>
        </div>
      </section>

      <section className="events-section section">
        <div className="container">
          <div className="section has-text-centered">
            <h2 className="is-size-3 has-text-weight-bold">
              Events
            </h2>
            <div className="content">
              <p>I travel around quite a bit. You can find me at these upcoming events!</p>
              {upcomingEvents.length > 0 
              ? (
              <ul className="latest-events">
                {upcomingEvents
                  .slice(0, 3)
                  .map(({ node: event }) => (
                    <li key={event.id}>
                      <Link to={event.fields.slug} className="title is-5">
                        {event.frontmatter.title}                        
                      </Link>
                      <p>{ new Date(event.frontmatter.start).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}) }</p>
                    </li>
                  ))
                }
              </ul>
              )
              : <p>No upcoming events yet.</p>
            }
            </div>
            <Link to='/events' className="">
              <button className="button is-link is-outlined">More Events</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="blog-section section">
        <div className="container">
          <div className="section has-text-centered">
            <h2 className="is-size-3 has-text-weight-bold">
              Blog
            </h2>
            
            <LatestPosts blogPosts={blogPosts}/>

            <Link to='/blog' className="">
              <button className="button is-link is-outlined">More Posts</button>
            </Link>
          </div>
        </div>
      </section>

    </div>
    
  )
}

HomepageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  aboutPhoto: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  photoHighlight: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const Homepage = ({ data }) => {
  const { markdownRemark: post } = data
  const { edges: posts } = data.posts
  const { edges: events } = data.events

 // console.log(events)
  const upcoming = events
    .filter( events => new Date(events.node.frontmatter.date) > Date.now() )

  //  console.log(upcoming)
  //  .map(({ node }) => )
  // const Events = events
  //   .filter( edgeItem => edgeItem.node.frontmatter.date > Date.now())
  //   .map(({ node }) => <PostItem key={node.id} node={node} /> )

  return (
    <Layout bodyClass="homepage" pageTitle={post.frontmatter.title} heroImage={post.frontmatter.hero}>
       <HomepageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        aboutPhoto={post.frontmatter.aboutPhoto}
        photoHighlight={post.frontmatter.photoHighlight}
        upcomingEvents={upcoming}
        blogPosts={posts}
      />
    </Layout>
  )
}

Homepage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Homepage

export const homepageQuery = graphql`
  query Homepage($id: String!) {
    # Get homepage sections
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        hero {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        aboutPhoto {
          childImageSharp {
            fluid(maxWidth: 640, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        photoHighlight {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }  
    
      }
    }
    
    # Get blog list
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { layout: { eq: "blog-post" } }}
      limit: 6
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            layout
            date(formatString: "MMMM DD, YYYY")
            hero {
              childImageSharp {
                fluid(maxWidth: 640, maxHeight: 365, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    events: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] },
      filter: { frontmatter: { layout: { eq: "Event" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            layout
            date(formatString: "MMMM DD, YYYY")
            start
            end
          }
        }
      }
    }


  }
`


