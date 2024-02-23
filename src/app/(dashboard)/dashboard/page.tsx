import React from 'react'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <main className="container flex h-full w-full flex-col py-10 ">
      <h1 className="text-xl font-semibold tracking-wide md:text-2xl lg:text-4xl">
        Dashboard
      </h1>
      <div className="w-full h-screen"></div>
    </main>
  )
}

export default DashboardPage