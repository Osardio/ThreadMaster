-- UpdateTable
update kits_threads
set quantity = null, updated_at = now()
where quantity = 0