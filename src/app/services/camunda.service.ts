import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {

  constructor(private apollo: Apollo) {}

  // Query para obtener tareas del usuario actual
  getTasks() {
    interface GetTasksResponse {
      tasks: Array<{
        id: string;
        name: string;
        formKey: string;
        variables: Array<{ name: string; value: any }>;
      }>;
    }

    return this.apollo.watchQuery<GetTasksResponse>({
      query: gql`
        query GetTasks {
          tasks(query: { assignee: "currentUser", state: ACTIVE }) {
            id
            name
            formKey
            variables { name value }
          }
        }
      `
    }).valueChanges.pipe(map(result => result.data.tasks));
  }

  // Mutación para completar una tarea
  completeTask(taskId: string, variables: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CompleteTask($taskId: String!, $variables: [VariableInput!]) {
          completeTask(taskId: $taskId, variables: $variables) {
            id
          }
        }
      `,
      variables: { taskId, variables }
    });
  }

  // Opcional: Reclamar la tarea si es necesario
  claimTask(taskId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ClaimTask($taskId: String!) {
          claimTask(taskId: $taskId) {
            id
          }
        }
      `,
      variables: { taskId }
    });
  }
}