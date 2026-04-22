
## Example `custom/Table/README.md`:

```markdown
# Table Component

A flexible data table with customizable columns and action slots.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `Column[]` | Yes | - | Array of column definitions |
| `data` | `Array` | Yes | - | Array of data objects to display |
| `hasActions` | `boolean` | No | `false` | Whether to show actions column |

### Column Interface

```typescript
interface Column {
    key: string;   // Property name from your data object
    label: string; // Display text for column header
}
```

# Example

```vue
<template>
    <Table 
        :columns="[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' }
        ]"
        :data="users"
        :has-actions="true"
    >
        <template #column-name="{ item }">
            <strong>{{ item.name }}</strong>
        </template>
        
        <template #actions="{ item }">
            <button @click="edit(item)">Edit</button>
            <button @click="delete(item)">Delete</button>
        </template>
    </Table>
</template>
```