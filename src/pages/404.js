import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout pageTitle="Not Found">
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <p>You just hit a page that doesn&#39;t exist.. the sandness.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
