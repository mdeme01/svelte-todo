<script lang="ts">
	import { todos } from '@stores/todo-store';
	import { Button, Checkbox, CloseButton, Input } from 'flowbite-svelte';
	import { EditOutline } from 'flowbite-svelte-icons';
	import { _ } from 'svelte-i18n';

	let todoText: string = '';
	let todoFilter: 'all' | 'pending' | 'completed' = 'all';

	$: completedTodos = $todos.filter((todo) => todo.completed);
	$: pendingTodos = $todos.filter((todo) => !todo.completed);

	const handleAddTodo = (e?: KeyboardEvent) => {
		if (!todoText) return;
		if (e && e.key !== 'Enter') return;
		todos.addTodo(todoText);
		todoText = '';
	};

	const clearCompleted = () => {
		completedTodos.forEach((todo) => todos.removeTodo(todo.id));
	};
</script>

<main class="mb-10 mt-10 flex flex-col items-center justify-center">
	<div class="mt-5 flex w-4/5 gap-2 sm:w-9/12 md:w-4/6 lg:w-1/2 xl:w-2/6">
		<Input
			class="bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200"
			bind:value={todoText}
			on:keydown={(e) => handleAddTodo(e)}
			name="addTodo"
			type="text"
			size="lg"
			placeholder={$_('todoAddInpText')}
		/>
		<Button on:click={() => handleAddTodo()}>{$_('todoAddBtnText')}</Button>
	</div>

	<div
		class="mt-5 flex w-4/5 flex-col justify-between gap-2 sm:w-9/12 sm:flex-row md:w-4/6 lg:w-1/2 xl:w-2/6"
	>
		<div class="mb-5 flex flex-col gap-2 sm:mb-0 sm:flex-row">
			<Button disabled={todoFilter === 'all'} on:click={() => (todoFilter = 'all')}
				>{$_('todoFilterAll')}</Button
			>
			<Button disabled={todoFilter === 'pending'} on:click={() => (todoFilter = 'pending')}
				>{$_('todoFilterPending')}</Button
			>
			<Button disabled={todoFilter === 'completed'} on:click={() => (todoFilter = 'completed')}
				>{$_('todoFilterCompleted')}</Button
			>
		</div>
		<Button disabled={!completedTodos.length} on:click={clearCompleted}
			>{$_('todoClearCompleted')}</Button
		>
	</div>

	{#if (todoFilter === 'all' && $todos.length) || (todoFilter === 'pending' && pendingTodos.length) || (todoFilter === 'completed' && completedTodos.length)}
		<ul class="mt-5 flex w-4/5 flex-col gap-2 sm:w-9/12 md:w-4/6 lg:w-1/2 xl:w-2/6">
			{#each todoFilter === 'all' ? $todos : todoFilter === 'pending' ? pendingTodos : completedTodos as todo (todo.id)}
				<li class="flex h-12 items-center justify-between gap-4 border-b border-b-primary-900">
					{#if todo.editing}
						<Input
							class="bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-200"
							bind:value={todo.text}
							on:keydown={(e) => {
								if (!todo.text) return;
								if (e.key !== 'Enter') return;
								todos.updateTodo(todo.id, todo.text);
								todos.toggleEditing(todo.id);
							}}
							name="updateTodo"
							type="text"
							size="md"
							placeholder={$_('todoUpdateInpText')}
						/>
					{:else}
						<div class={todo.completed ? 'italic line-through' : ''}>{todo.text}</div>
					{/if}
					<div class="flex items-center gap-2">
						<Checkbox
							class="cursor-pointer p-2"
							disabled={todo.editing}
							checked={todo.completed}
							name="toggleCompleted"
							on:change={() => todos.toggleCompleted(todo.id)}
						/>
						<EditOutline class="cursor-pointer" on:click={() => todos.toggleEditing(todo.id)} />
						<CloseButton disabled={todo.editing} on:click={() => todos.removeTodo(todo.id)} />
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mt-10">{$_('todoNoTodosInCategory')}</p>
	{/if}
</main>
