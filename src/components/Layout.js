import React, { Component } from "react";
import Card from "../components/Card";
import axios from "axios";
import {
   WrapperSection,
   HeadingPrimary,
   WrapperMain
} from "../components/style-utils";

class Layout extends Component {
   constructor() {
      super();
      this.state = {
         data: []
      };
   }

   componentDidMount() {
      axios
         .get("https://jffy-api.herokuapp.com/api/v1/spotify/featured")
         .then(response =>
            this.setState({
               data: response.data.items
            })
         );
   }

   render() {
      console.log("state: ", this.state.data);
      const featured = this.state.data.map(item => {
         console.log("items", item.images[0].url);

         return <Card image={item.images[0].url} name={item.name} />;
      });

      return (
         <div>
            <WrapperMain>
               <WrapperSection>
                  <HeadingPrimary>Featured</HeadingPrimary>
                  {featured}
               </WrapperSection>
            </WrapperMain>
         </div>
      );
   }
}

export default Layout;
