export default {
  methods: {
    deleteUndefinedPropsOfObject(object) {
      for (const [key, value] of Object.entries(object)) {
        if (value === undefined) {
          delete object[key]
        }
      }
    },
    getMergedArraysWithoutDuplicates(array1, array2) {
      array1 = array1.map((e) => JSON.stringify(e))
      array2 = array2.map((e) => JSON.stringify(e))

      let mergedArrays = array1.concat(array2)
      mergedArrays = Array.from(new Set(mergedArrays))

      return mergedArrays.map((e) => JSON.parse(e))
    },
  },
}
