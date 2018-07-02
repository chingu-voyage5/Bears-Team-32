import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import HomeResult from "./HomeResult";
import styled from "styled-components";
import { withRouter } from "react-router";

const apiBase = "https://jffy-api.herokuapp.com/api/v1/spotify";
// const apiBase = 'http://localhost:3001/api/v1/spotify';

const Links = [
   // { name: 'podcasts', to: '/browse/podcasts' },
   { name: "featured", to: "/browse/featured", api: `${apiBase}/featured` },
   {
      name: "genres & moods",
      to: "/browse/genres",
      api: `${apiBase}/categories`
   },
   {
      name: "new releases",
      to: "/browse/newreleases",
      api: `${apiBase}/new-releases`
   },
   { name: "discover", to: "/browse/discover", api: `${apiBase}/discover` }
];

const bgColors = {
   featured: "#5D3F3A",
   podcasts: "#7A211E",
   "genres & moods": "#262426",
   "new releases": "#2e426b",
   discover: "#3A495E"
};

class Home extends Component {
   state = { currentLink: Links[0] };

   componentDidUpdate() {
      if (this.props.location.pathname.includes("/browse")) {
         if (this.props.location.pathname !== this.state.currentLink.to) {
            const selectedLink = Links.filter(link => {
               return link.to === this.props.location.pathname;
            })[0];
            if (selectedLink) {
               document.title = selectedLink.name;
               this.setState({ currentLink: selectedLink });
            }
         }
      }
   }

   clickHandler = selectedlinkName => {
      const selectedLink = Links.filter(link => {
         return link.name === selectedlinkName;
      })[0];
      document.title = selectedLink.name;
      this.setState({ currentLink: selectedLink });
   };

   linkProps = ({ to, name }) => {
      const { currentLink } = this.state;
      return {
         key: to,
         to,
         onClick: () => this.clickHandler(name),
         selected: currentLink.name === name
      };
   };

   getRoutes = ({ name, to, api }) => {
      const layoutComp = <HomeResult name={name} api={api} />;
      return name !== "featured" ? (
         <Route path={to} render={() => layoutComp} key={name} />
      ) : null;
   };

   render() {
      const { currentLink } = this.state;
      // console.log("currentLink: ", currentLink);

      return (
         <HomeWrapper>
            <Wrapper bgColor={bgColors[currentLink.name]}>
               {Links.map(link => (
                  <StyledLink {...this.linkProps(link)}>{link.name}</StyledLink>
               ))}
               <Switch>
                  {Links.map(link => this.getRoutes(link))}
                  <Route
                     render={() => (
                        <HomeResult
                           currentLink={this.state.currentLink}
                           name={Links[0].name}
                           api={Links[0].api}
                        />
                     )}
                  />
               </Switch>
            </Wrapper>
         </HomeWrapper>
      );
   }
}

export default withRouter(Home);

const HomeWrapper = styled.div`
   height: 100%;
   overflow: auto;
`;

const Wrapper = styled.div`
   box-sizing: border-box;
   background-color: ${props => props.bgColor};
   position: relative;
   min-height: 100%;
   padding-top: 2rem;
   transition: background-color 500ms;
   &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      background: linear-gradient(
         to bottom,
         rgba(0, 0, 0, 0),
         rgba(0, 0, 0, 1)
      );
   }
`;

const StyledLink = styled(Link)`
   position: relative;
   color: ${props => (props.selected ? "white" : "gray")};
   text-decoration: none;
   padding: 0 1.5rem;
   text-transform: uppercase;
   letter-spacing: 0.125rem;
   font-size: 0.75rem;
   font-weight: 700;
   transition: color 400ms;
   &:hover {
      color: white;
   }

   &:after {
      content: "";
      display: ${props => (props.selected ? "block" : "none")};
      width: 30px;
      height: 2px;
      background-color: green;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -6px;
   }
`;
