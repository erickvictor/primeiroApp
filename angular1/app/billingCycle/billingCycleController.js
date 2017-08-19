(function() {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, $location, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function() {
      const page = parseInt($location.search().page) || 1
      $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
        vm.billingCycle = {credits: [{}], debts: [{}]}
        vm.billingCycles = response.data
      //  vm.calculateValues()

        $http.get(`${url}/count`).then(function(response) {
          vm.pages = Math.ceil(response.value / 10)
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
      })
    }

    vm.create = function() {
      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function(response) {
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function(billingCycle) {
      vm.billingCycle = billingCycle
//      vm.calculateValues()
      tabs.show(vm, {tabUpdate: true})
    }

    vm.showTabDelete = function(billingCycle) {
      vm.billingCycle = billingCycle
//      vm.calculateValues()
      tabs.show(vm, {tabDelete: true})
    }

    vm.update = function() {
      const updateUrl = `${url}/${vm.billingCycle._id}`
      $http.put(updateUrl, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function(response) {
        msgs.addError(response.data.errors)
      })
    }

    vm.delete = function() {
      const deleteUrl = `${url}/${vm.billingCycle._id}`
      $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function(response) {
        msgs.addError(response.data.errors)
      })
    }

    vm.refresh()

  }
})()