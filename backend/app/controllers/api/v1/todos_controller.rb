class Api::V1::TodosController < Api::BaseApiController
  
  before_action :authenticate_api_v1_user!
  before_action :set_todo, only: [ :update]

  # GET /todos
  def index
    todos = current_user.todos.order(updated_at: :DESC)
    render json: { data: todos }, status: :ok
  end

  # POST /todos
  def create
    begin
      # Rails.logger.debug "[DEBUG] todo_params#{todo_params.inspect}"
      todo = current_user.todos.new(todo_params)
      if todo.save
        render json: { data: todo },status: :created
      else
        render json: { data: [message: "Todo data failed to create - #{todo.errors.full_messages}"]}, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.error "[ERROR] #{e.class}: #{e.message}" 
      Rails.logger.error e.backtrace.join("\n") 
      render json: { error: "Internal Server Error", message: e.message }, status: :internal_server_error
    end
  end

  # PATCH/PUT /todos/:id
  def update
    begin
      # Rails.logger.debug "[DEBUG] todo_params#{todo_params.inspect}"
      if @todo.update(todo_params)
        render json: { data: @todo }, status: :ok  # 200
      else
        render json: { data: [message: "Todo data failed to update - #{todo.errors.full_messages}"]}, status: :unprocessable_entity # 422
      end
    rescue => e
      Rails.logger.error "[ERROR] #{e.class}: #{e.message}" 
      Rails.logger.error e.backtrace.join("\n") 
      render json: { error: "Internal Server Error", message: e.message }, status: :internal_server_error
    end
  end

  # PATCH /todos/bulk_delete
  def bulk_delete
    begin
      sql_response = current_user.todos.mark_as_deleted
      render json: { data: [message: "bulk_delete is done",deleted_todo_count: sql_response] }, status: :ok 
    rescue => e
      Rails.logger.error "[ERROR] #{e.class}: #{e.message}" 
      Rails.logger.error e.backtrace.join("\n") 
      render json: { error: "Internal Server Error", message: e.message }, status: :internal_server_error
    end
  end
  
  private 

    def set_todo
      @todo = current_user.todos.find_by(id: params[:id])
      render json: { error: "Todo not found" }, status: :not_found unless @todo
    end
    
    def todo_params
      params.fetch(:todo, {}).permit(:name,:is_done,:is_trashed,:memo)
    end
end
