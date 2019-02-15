import React from 'react'
import { StaticQuery, graphql, navigate } from "gatsby"
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
const localizer = BigCalendar.momentLocalizer(moment) 


const DisplayCalendar = ({ data }) => {
    const { edges: events } = data.allMarkdownRemark

    events.forEach(
        function(event) {
          event.start = new Date(event.node.frontmatter.start)
          event.end = new Date(event.node.frontmatter.end)
          event.title = event.node.frontmatter.title
        }
      )
    return (
        <div className="calendar">
            {/* { console.log(events) } */}
            <BigCalendar
                eventPropGetter={event => ({className: ['cat-' + event.node.frontmatter.category.toLowerCase(), event.node.frontmatter.teaching ? 'teaching':''] })}            
                localizer={localizer}
                selectable
                events={events}
                timeslots={1}
                step={60}
                onSelectEvent={ event => navigate(event.node.fields.slug, { state: { pleasant: 'reasonably' }}) }
                formats={{dayFormat: 'ddd M/D'}}
            />
        </div>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
        query {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
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
                      category
                      teaching
                    }
                  }
                }
              }
        }
        `}
        render={data => <DisplayCalendar data={data} {...props} />}
    />
)