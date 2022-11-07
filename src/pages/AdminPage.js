import React from 'react'
import PersistentDrawerLeft from '../components/sidebar/Sidebar'

function AdminPage({children}) {
  return (
    <div>
      <PersistentDrawerLeft>
        {children}
      </PersistentDrawerLeft>
    </div>
  )
}

export default AdminPage