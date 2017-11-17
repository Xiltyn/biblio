import * as React from 'react';

export default class InfoView extends React.Component {
    render () {
      return (
        <div className="view-container">
          <div className="details-edit">
              <div className="info-edit">
                  <div className="search-result-author">{this.props.element.surname} {this.props.element.firstname}</div>
                  <div className="search-result-title">
                      <h2>
                          {this.props.element.title}
                      </h2>
                  </div>
                  <div className="details">
                      <div className="search-result-year"><h2>Rok:</h2>{this.props.element.year}</div>
                      <div className="search-result-place"><h2>Miejsce Wydania:</h2>{this.props.element.place} </div>

                  </div>
              </div>
              <div className="category">
                  <div className="search-result-category">{this.props.element.category}</div>
              </div>
              <div className="more-info">
                  <div className="search-result-more search-result-series"><h2>Seria:</h2><p> {this.props.element.series} </p></div>

                  <div className="search-result-more search-result-publisher"><h2>Wydawca:</h2><p>{this.props.element.publisher}</p></div>
                  <div className="search-result-more search-result-print"> <h2>Drukarnia:</h2><p> {this.props.element.printingHouse}</p></div>
                  <div className="search-result-more search-result-format"><h2>Format:</h2> <p>{this.props.element.format} </p></div>
                  <div className="search-result-more search-result-pages"><h2>Ilość stron:</h2> <p>{this.props.element.pages}</p></div>
                  <div className="search-result-more search-result-appendices"><h2>Ilustracje:</h2> <p>{this.props.element.appendices}</p></div>
                  <div className="search-result-more search-result-attachments"><h2>Załączniki:</h2><p> {this.props.element.attachments} </p></div>
                  <div className="search-result-more search-result-publishing-details"><h2>Opis oprawy:</h2><p> {this.props.element.publishingDetails}</p></div>
                  <div className="search-result-more search-result-autographs"><h2>Dedykacje:</h2><p> {this.props.element.autographs}</p></div>
                  <div className="search-result-more search-result-description"><h2>Informacje:</h2><p> {this.props.element.description}</p></div>


              </div>
          </div>
            <div className="options-menu">
                Edit<br/>
                Delete
            </div>
        </div>
      )
    }
}
