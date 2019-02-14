import React from 'react'
import Gallery from 'react-grid-gallery';

const PhotoGallery = ({ images }) => {
    images.forEach(
        function(image) {
            image.src = image.node.childImageSharp.original.src
            image.thumbnail = image.node.childImageSharp.resize.src
            image.thumbnailWidth = image.node.childImageSharp.resize.width
            image.thumbnailHeight = image.node.childImageSharp.resize.height
        }
      )
    return (
          <div className="photo-gallery is-clearfix">
            {/* {console.log(images)} */}
            <Gallery images={images} enableImageSelection={false} backdropClosesModal={true} rowHeight={400} lightboxWidth={1536} />
          </div>
    )
}

export default PhotoGallery