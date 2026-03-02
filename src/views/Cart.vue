<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="text-right">{{ item.calories }}</td>
              <td class="text-right">{{ item.fat }}</td>
              <td class="text-right">{{ item.carbs }}</td>
              <td class="text-right">{{ item.protein }}</td>
              <td class="text-right">{{ item.iron }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Cart",
};
</script>

<style scoped></style>
