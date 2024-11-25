'use client';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import FormBackOrder from './FormBackOrder'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: "Print",
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          // onClick={(event) => {
          //   handleClick(event, cellValues);
          // }}
        >
          Print
        </Button>
      );
    }
  },
  {
    field: "Route",
    renderCell: (cellValues) => {
      return <Link href={`#${cellValues.row.url}`}>Link</Link>;
    }
  },
  {
    field: "FormBKO",
    width: 360,
    renderCell:(cellValues) => {
      return <FormBackOrder />;
    }
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, url: "aryaspage"},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, url: "aryaspage" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, url: "aryaspage" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, url: "aryaspage" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, url: "aryaspage" },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, url: "aryaspage" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, url: "aryaspage" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, url: "aryaspage" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, url: "aryaspage" },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const aux: number = 10;
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch('/api/backorder')
      let data = await res.json()
      console.log(data['orders'])
      data['orders'].map((i:any, x:number) => (
        rows.push({ id: aux + x, lastName: i.CUSTOMER, firstName: i.OrderNumber, age: 500, url: "abc"})
      ))
      setPosts(rows)
    }
    fetchPosts()
  }, [])

  if (!posts) return <div>Loading...</div>

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <ul>
        {posts.map((post: any, index: number) => (
          <li key={post.id}>{post.id}  + {post.lastName}---{post.firstName}</li>
        ))}
      </ul>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
