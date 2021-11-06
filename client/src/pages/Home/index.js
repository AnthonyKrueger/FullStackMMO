import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import {GET_USER} from "../../utils/queries"

import Auth from "../../utils/auth";

export default function HomePage() {

    let token = localStorage.getItem('id_token');

    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: {id: Auth.getProfile().data.id},
        fetchPolicy: "cache-and-network"
      });

  
    if (!token) {
      return <Redirect to='/' />
    };

    if (loading) {
        return (
            <div className="loader">
              <h3>Loading...</h3>
            </div>
        )
      }
      console.log(data)

    return (
        <div className="dashboardPage">
            <p>{data ? data.user.username : null}</p>
        </div>
    )
}