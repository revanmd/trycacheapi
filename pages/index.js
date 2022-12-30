import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import Dexie from "dexie";
import {jatiluwihPolygons} from "../dummy/jatiluwih_polygon"

// const database = new Dexie("database");
// database.version(1).stores({
//   customers: '++id, name, dept',
// });

// const customerTable = database.table('customers');

export default function Home() {
  // const addData = async (customer) => {
  //   try {
  //     const id = await customerTable.add(customer);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const downloadData = ()=>{
  //   for (let j = 0; j < 10; j++) {
  //     setTimeout(()=>{
  //       for (let index = 0; index < 5000; index++) {
  //         addData({
  //           'name':'Revan Muhammad Dafa',
  //           'dept':'TI'
  //         })
  //       }
  //       alert(j)
  //     },10000) 
  //   }
  // }

  const cachedData = () =>{
    for (let i = 0; i < 10; i++) {
      const jsonResponse = new Response(JSON.stringify(jatiluwihPolygons), {
        headers: {
          'content-type': 'application/json'
        }
      });
      let filename = '/data_' + i + '.json'
      caches.open('json-cache').then(cache => cache.put(filename, jsonResponse));
      
    }
  }

  const readCachedData = () =>{
    caches.match('/data.json').then(r => r.json()).then(console.log)
  }

  return (
    <>
      Hello World
      <button
        onClick={readCachedData}
      >
        Download
      </button>
      <button
        onClick={cachedData}
      >
        Cached Data
      </button>
    </>
  )
}
